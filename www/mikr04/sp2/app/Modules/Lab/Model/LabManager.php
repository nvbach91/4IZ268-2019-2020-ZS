<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 29.12.2019
 * Time: 13:01
 */

namespace App\Modules\Lab\Model;

use App\Model\CompanyManager;
use App\Model\UserManager;

class LabManager extends \App\Model\BaseModule
{

    public function __construct(\Nette\Security\User $user, CompanyManager $companyManager)
    {
        parent::__construct($user, $companyManager);
        $this->db_prefix .= "lab_";
    }

    public function getAllWebs($order = "desc") {
        if ($order == "asc") {
            return $this->database->query("SELECT * FROM podnik_lab_web WHERE active = 1 ORDER BY domain ASC")->fetchAll(); // TODO - SQL Injection Refactor
        }
        else {
            return $this->database->query("SELECT * FROM podnik_lab_web WHERE active = 1 ORDER BY domain DESC")->fetchAll(); // TODO - SQL Injection Refactor
        }
    }
    public function getWeb($domain) { // TODO - Udělat view v DB
        return $this->database->query("SELECT w.*, min(date) as last, max(date) as first, max(t.score) as score FROM podnik_lab_web w inner join podnik_lab_web_test t on w.domain = t.domain WHERE w.domain = ?", $domain)->fetch();
    }

    public function newTest($domain, $score) {
        if (!$this->database->fetch("SELECT * FROM podnik_lab_web WHERE domain = ?",$domain)) {
            $this->database->query("INSERT INTO podnik_lab_web ?", [
                'domain' => $domain
            ]);
        }
        return $this->database->query("INSERT INTO podnik_lab_web_test ?",[
            'domain' => $domain,
            'score' => $score
        ]);
    }

    public function removeWeb($domain) {
        return $this->database->query("UPDATE podnik_lab_web SET active = 0 WHERE domain = ?",$domain);
    }
}