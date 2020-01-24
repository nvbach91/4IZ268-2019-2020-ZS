<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 27.12.2019
 * Time: 22:26
 */

namespace App\Presenters;

final class SignPresenter extends \Nette\Application\UI\Presenter
{
    private $httpRequest;
    private $user;
    public function __construct(\Nette\Http\Request $httpRequest, \Nette\Security\User $user)
    {
        $this->httpRequest = $httpRequest;
        $this->user = $user;
    }
    public function startup() {
        parent::startup();
        $this->template->base = $this->getHttpRequest()->getUrl()->getBasePath();
    }
    public function actionIn()
    {
        if ($this->httpRequest->isAjax()) {
            $email = $this->httpRequest->getPost('email');
            $pass = $this->httpRequest->getPost('password');
            try {
                $this->user->login($email, $pass);
                $this->sendResponse(new \Nette\Application\Responses\JsonResponse(1));
            } catch (\Nette\Security\AuthenticationException $e) {
                $this->sendResponse(new \Nette\Application\Responses\JsonResponse(0));
            }
        }
    }
    public function actionOut()
    {
        $this->user->logout();
        $this->redirect('Home:');
    }
    public function renderUp() {
        $pass = new \Nette\Security\Passwords();
        dump($pass->hash("demo"));

    }
}