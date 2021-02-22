import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructionsPage } from './instructions.page';

describe('InstructionsPage', () => {
  let component: InstructionsPage;
  let fixture: ComponentFixture<InstructionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
