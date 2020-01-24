<?php

namespace App\Model;

class MailManager extends BaseManager
{
	
	public function getUnreadMails($userId)
	{
		$user = $this->database->fetch('SELECT * FROM users WHERE id = ?', $userId);
		$host = $this->database->fetch('SELECT * FROM company WHERE id = ?', $user->company);
		$mbox = imap_open("{".$host->imap_host.":993/imap/ssl}INBOX", "$user->imap_user", "$user->imap_pass")
			or die("can't connect: " . imap_last_error());

		$check = imap_mailboxmsginfo($mbox);
		    //echo "Date: "     . $check->Date    . "<br />\n" ;
		    //echo "Driver: "   . $check->Driver  . "<br />\n" ;
		    //echo "Mailbox: "  . $check->Mailbox . "<br />\n" ;
		    //echo "Messages: " . $check->Nmsgs   . "<br />\n" ;
		    //echo "Recent: "   . $check->Recent  . "<br />\n" ;
		    //echo "Unread: "   . $check->Unread  . "<br />\n" ;
		    //echo "Deleted: "  . $check->Deleted . "<br />\n" ;
		    //echo "Size: "     . $check->Size    . "<br />\n" ;

		imap_close($mbox);
		return $check;
	}
}