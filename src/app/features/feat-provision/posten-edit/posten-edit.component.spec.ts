import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostenEditComponent } from './posten-edit.component';

describe('PostenEditComponent', () => {
  let component: PostenEditComponent;
  let fixture: ComponentFixture<PostenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostenEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
