import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerbTooltipPage } from './verb-tooltip.page';

describe('VerbTooltipPage', () => {
  let component: VerbTooltipPage;
  let fixture: ComponentFixture<VerbTooltipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbTooltipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerbTooltipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
