import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostenFormComponent } from './posten-form.component';

describe('PostenFormComponent', () => {
  let component: PostenFormComponent;
  let fixture: ComponentFixture<PostenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
