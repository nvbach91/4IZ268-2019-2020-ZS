<?php

namespace App\Presenters;

use Nette;
use \App\Components;
use \Nette\Security\Permission;

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{
    /** @var Nette\Security\User @inject */
    public $user;
    /** @var \App\Model\CompanyManager @inject */
    public $companyManager;
    /** @var \App\Model\ModuleManager @inject */
    public $moduleManager;
    /** @var \App\Model\MailManager @inject */
    public $mailManager;

    protected $acl;

    protected function startup()
    {
        if (!$this->user->isLoggedIn()) { // TODO - Proč tu musí u některách preseterů být !$this->>user
            $this->redirectUrl($this->getHttpRequest()->getUrl()->getBasePath().'sign/in'); // TODO - Vyřešit pomocí metody redirect()
        }
        $this->acl = new Permission;
        $this->acl->addRole('user');
        $this->acl->addRole('admin');
        $this->acl->addRole('root');

        $this->template->user = $this->user->getIdentity();
        $this->template->company = $this->companyManager->getCompany($this->user->getIdentity()->getData()['company']);
        $this->template->modules = $this->moduleManager->getUserModules($this->user->getIdentity()->getData()['company'],$this->user->getIdentity()->getId());
        if (isset($this->user->getIdentity()->getData()['mail'])) {
            $this->template->mailInfo = $this->mailManager->getUnreadMails($this->user->getIdentity()->getId());
        }
        foreach ($this->moduleManager->getAllModules() as $mod) {
            $this->acl->addResource($mod->tag);
        }
        foreach ($this->moduleManager->getUserModules($this->user->getIdentity()->getData()['company'],$this->user->getIdentity()->getId()) as $mod) {
            $this->acl->allow($this->user->getIdentity()->getRoles(), $mod->id, 'view');
        }
        $this->setLayout(__DIR__ . "/templates/@layout.latte");
        parent::startup();
    }

    protected function createComponentHeader(): Components\HeaderControl
    {
        $header = new Components\HeaderControl();
        $header->redrawControl();
        return $header;
    }
    protected function createComponentMenu(): Components\MenuControl
    {
        $header = new Components\MenuControl();
        $header->redrawControl();
        return $header;
    }
}
