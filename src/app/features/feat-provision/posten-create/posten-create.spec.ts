import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostenCreate } from './posten-create';

describe('PostenCreate', () => {
  let component: PostenCreate;
  let fixture: ComponentFixture<PostenCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostenCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostenCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
