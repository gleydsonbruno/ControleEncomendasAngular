import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pendentes } from './pendentes';

describe('Pendentes', () => {
  let component: Pendentes;
  let fixture: ComponentFixture<Pendentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pendentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pendentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
