<?php

namespace App\Model;

class ModuleManager extends BaseManager
{
	public function getAllModules()
	{
		return $this->database->fetchAll('SELECT * FROM module');
	}
	public function getCompanyModules($id)
	{
		return $this->database->fetchAll('SELECT * FROM company_modules INNER JOIN modules ON company_modules.mod_id = module.id WHERE com_id = ?', $id);
	}
	public function getUserModules($userId)
	{
		return $this->database->fetchAll('SELECT * FROM user_module_view WHERE user_id = ?;', $userId);
	}
}