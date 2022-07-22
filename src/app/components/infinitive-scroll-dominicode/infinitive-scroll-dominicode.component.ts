import { Component, OnInit, HostListener } from '@angular/core';
import { TestService } from 'src/app/test.service';

@Component({
  selector: 'app-infinitive-scroll-dominicode',
  templateUrl: './infinitive-scroll-dominicode.component.html',
  styleUrls: ['./infinitive-scroll-dominicode.component.css'],
})
export class InfinitiveScrollDominicodeComponent implements OnInit {
  showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;

  users: any[];

  currentPage: number;
  totalPage: number;

  constructor(private testService: TestService) {
    this.showGoUpButton = false;
    this.users = [];
    this.currentPage = 1;
    this.totalPage = 2;
  }

  //Para mostrar u ocultar el boton
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }

  ngOnInit() {
    this.add6Users();
  }

  add6Users() {
    this.testService.getUsers(this.currentPage).subscribe((data: any) => {
      this.users = this.users.concat(data.data);
    });
  }

  onScroll() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.add6Users();
    } else {
      console.log('finish page');
    }
  }

  scrollTop() {
    // document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
}
