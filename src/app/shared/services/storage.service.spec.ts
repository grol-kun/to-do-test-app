import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should set and get item from local storage', () => {
    const key = 'testKey';
    const value = { name: 'Test', age: 25 };

    storageService.setItem(key, value);

    const retrievedValue = storageService.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should return null for non-existing item in local storage', () => {
    const key = 'nonExistingKey';

    const retrievedValue = storageService.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should remove item from local storage', () => {
    const key = 'testKey';
    const value = { name: 'Test', age: 25 };

    storageService.setItem(key, value);
    storageService.removeItem(key);

    const retrievedValue = storageService.getItem(key);

    expect(retrievedValue).toBeNull();
  });
});
