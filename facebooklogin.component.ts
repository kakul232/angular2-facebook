import {Component, OnInit,NgZone} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";


declare const FB:any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'facebooklogin.html',
    directives: [ROUTER_DIRECTIVES]
})

export class FacebookLoginComponent implements OnInit {
    
    name=""
    isUser = false

    constructor(private _ngZone: NgZone) {
        FB.init({
            appId      : 'your-app-id',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
             var self = this;
        
        FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
                 self._ngZone.run(() => {
				        self.name = response.name;
				        self.isUser = true
});
               console.log('Good to see you, ' + response.name + '.');
              
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
    };
    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
}
