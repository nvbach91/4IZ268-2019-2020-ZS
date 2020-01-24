<?php

use Nette\Security as NS;

class Authenticator implements NS\IAuthenticator
{
    public $database;
    private $passwords;
    private $userManager;

    function __construct(Nette\Database\Context $database, NS\Passwords $passwords, App\Model\UserManager $userManager)
    {
        $this->database = $database;
        $this->passwords = $passwords;
        $this->userManager = $userManager;
    }

    function authenticate(array $credentials): NS\IIdentity
    {
        list($username, $password) = $credentials;
        $row = $this->database->table('user')
            ->where('email', $username)->fetch();

        if (!$row) {
            throw new NS\AuthenticationException('User not found.');
        }

        if (!$this->passwords->verify($password, $row->password)) {
            throw new NS\AuthenticationException('Invalid password.');
        }

        $data = [
            'name' => $row->name,
            'surname' => $row->surname,
            'email' => $row->email,
            'company' => $row->company_id
        ];
        return new Nette\Security\Identity($row->id, $row->role, $data);
    }
}