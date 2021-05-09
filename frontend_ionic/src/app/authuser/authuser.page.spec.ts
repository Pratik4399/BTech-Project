import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthuserPage } from './authuser.page';

describe('AuthuserPage', () => {
  let component: AuthuserPage;
  let fixture: ComponentFixture<AuthuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
