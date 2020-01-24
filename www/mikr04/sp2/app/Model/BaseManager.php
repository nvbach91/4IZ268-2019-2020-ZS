<?php

namespace App\Model;

abstract class BaseManager
{
	protected $database;

  public function __construct(\Nette\Database\Connection $database)
  {
    $this->database = $database;
  }
}