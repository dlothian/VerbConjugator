import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerbsPage } from './verbs.page';

describe('VerbsPage', () => {
  let component: VerbsPage;
  let fixture: ComponentFixture<VerbsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerbsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
