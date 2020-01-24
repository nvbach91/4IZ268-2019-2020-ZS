<?php

namespace App\Model;

class UserManager extends BaseManager
{

    public function getUser($id)
    {
        return $this->database->fetch('SELECT * FROM user WHERE id = ?', $id);
    }
    public function getName($id)
    {
        return $this->database->fetchField('SELECT name+" "+surnmame FROM user WHERE id = ?', $id);
    }
}