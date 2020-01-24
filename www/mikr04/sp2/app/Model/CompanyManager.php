<?php

namespace App\Model;

class CompanyManager extends BaseManager
{
	
	public function getCompany($id)
	{
		return $this->database->fetch('SELECT * FROM company WHERE id = ?', $id);
	}
	public function getCompanyUsers($id)
	{
		return $this->database->fetchAll('SELECT * FROM users WHERE company = ?', $id);
	}
	public function getDbCredentials($id) {
	    return $this->database->fetch('SELECT db_host,db_name,db_prefix,db_user,db_pass FROM company WHERE id = ?', $id);
    }
}