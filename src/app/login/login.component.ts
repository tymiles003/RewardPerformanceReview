import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, LocalStorageService, HttpResponse, AuthenticateRequestDto, EmployeeDto } from '../shared/index';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LocalStorageService, HttpService]
})
export class LoginComponent implements OnInit {

  httpService: HttpService;
  localStorageService: LocalStorageService;
  router: Router;

  authenticateRequestDto: AuthenticateRequestDto;
  employeeDto: EmployeeDto;
  isStored: boolean;

  constructor(httpService: HttpService, localStorageService: LocalStorageService, router: Router) {
    this.httpService = httpService;
    this.localStorageService = localStorageService;
    this.router = router;
    this.authenticateRequestDto = new AuthenticateRequestDto();
    this.isStored = false;
  }

  ngOnInit() {
  }

  authenticate(authenticateRequestDto: AuthenticateRequestDto) {

    // Make request to Authentication stub endpoint
    const loginInfo = this.httpService.post<AuthenticateRequestDto, EmployeeDto>(
      environment.apiRootUrl + environment.authenticateUrl, this.authenticateRequestDto)
                      .responseData()
                      .subscribe(
                        (returnedEmployeeDto) => { this.employeeDto = returnedEmployeeDto; },
                        err => {
                          alert('Username or password is incorrect');
                          console.log(err);
                        },
                        () => {

                          // Store Auth Creds for later access throughout app
                          this.localStorageService.set('auth', this.employeeDto)
                          .subscribe(
                            (isSaved) => {
                              this.isStored = isSaved;
                              console.log('saved auth details');

                              if (this.employeeDto.isAdmin) {
                                this.router.navigate(['/admin-dashboard']);

                              } else {
                                this.router.navigateByUrl('/dashboard');

                              }
                            },
                            err => { console.log(err); });
                        }
                      );
  }

}


