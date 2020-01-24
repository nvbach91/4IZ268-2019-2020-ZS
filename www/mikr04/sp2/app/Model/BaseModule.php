<?php

namespace App\Model;

abstract class BaseModule
{
    protected $database;

    protected $db_prefix;

    public function __construct(\Nette\Security\User $user, CompanyManager $companyManager)
    {
        $companyId = $user->getIdentity()->getData()['company'];
        try {
            $cred = $companyManager->getDbCredentials($companyId);
            $this->db_prefix = $cred->db_prefix;
            $this->database = new \Nette\Database\Connection("mysql:host=$cred->db_host;dbname=$cred->db_name", $cred->db_user, $cred->db_pass);
        } catch (Exception $e) {
            throw new Exception('Nepodařilo se připojit k firemní databázi. Zkontrolujte prosím přihlašovací údaje.');
        }
    }
}