import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionenComponent } from './provisionen.component';

describe('Posten', () => {
  let component: ProvisionenComponent;
  let fixture: ComponentFixture<ProvisionenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvisionenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
