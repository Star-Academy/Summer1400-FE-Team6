import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;

  it('should create', () => {
    component = new FavoriteComponent({ likedSongs: [] } as any);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
