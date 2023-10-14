import { Pipe, PipeTransform, Component, SecurityContext } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {DomSanitizer} from "@angular/platform-browser";
import { YtBrieferRequestService } from '../app/yt-briefer-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Video Briefer';
  values = '';
  clickMessage = '';
  iframeSrc:any;
  brieferForm = this.formBuilder.group({url: ''});
  videoSummary = '';
  ytUrl = '';
  isLoading = true;
  transform() {
    console.log(this.ytUrl);
    let u = new URL(this.ytUrl);
    return u.searchParams.get('v');
  }
  onLoad() { // without type info
    const vId = this.transform();
    if (vId == null) {
      this.clickMessage = 'Invalid url';
      return;
    }

    const embedUrl = 'https://www.youtube.com/embed/' + vId;
    this.iframeSrc = 
      this._sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  
  onBrief() {
    this.isLoading = true;
    this.clickMessage = 'Loading summary...';
    // Send request to backend to retrieve the data and render if get a response or
    // render the dummy data.
    this.ytBrieferService.getSummaryOfVideo(this.ytUrl).subscribe({
      next: (response) => {
        console.log("hello", response);
        this.videoSummary = response.trim();
        this.isLoading = false;
        this.clickMessage = '';
      },
      error: (e) => {
        this.isLoading = false;
        this.videoSummary = 'Summary was not available\n. Likely author restricted it';
        this.clickMessage = '';
        console.log(e);
      }
    });
  }

  constructor(
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private ytBrieferService: YtBrieferRequestService
    ) {}

}
