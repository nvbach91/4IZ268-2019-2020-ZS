<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 29.12.2019
 * Time: 13:01
 */

namespace App\Modules\Lab\Model;

class PageInsights
{

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function getAllWebs() {
        return $this->database->query("SELECT * FROM podnik_lab_web")->fetchAll();
    }
    public function getWeb($domain) {
        return $this->database->query("SELECT * FROM podnik_lab_web WHERE domain = ?", $domain)->fetch();
    }
}