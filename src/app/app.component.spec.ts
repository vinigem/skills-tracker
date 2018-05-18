import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from './overlay/overlay.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AlertComponent, OverlayComponent
      ],
      providers: [
        AlertService, OverlayService
      ],
      imports: [ RouterTestingModule.withRoutes([]) ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
