import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sanitizer',
  templateUrl: './sanitizer.component.html',
  styleUrls: ['./sanitizer.component.css'],
})
export class SanitizerComponent implements OnInit {
  urlUntrusted = "javascript:alert('hello')";
  urlTrusted;
  url;
  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.urlTrusted = this.domSanitizer.bypassSecurityTrustUrl(
      this.urlUntrusted
    );
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/'
    );
  }

  getSanitizedURL() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/' + '&output=embed'
    );
  }
}
