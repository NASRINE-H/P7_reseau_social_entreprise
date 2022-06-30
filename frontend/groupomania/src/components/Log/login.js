import React from "react";

const Login = () => {
    return ( 
        <div>
        <h>Login</h>
        <app-login>
            <form class="ng-untouched ng-pristine ng-invalid">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="email" id="email" type="email"></input>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="password" id="password" type="password"></input>
                </div>
                <button color="primary" mat-raised-button="" class="mat-raised-button mat-button-base mat-primary" disabled="true">
                    <span class="mat-button-wrapper">LOGIN</span>
                    <div class="mat-button-ripple mat-ripple" matripple=""></div>
                    <div class="mat-button-focus-overlay"></div>
                </button>
            </form>
        </app-login>
        </div>
    );
};
//<Login/>

export default Login;