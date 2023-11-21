const encryptionService = require('./encryptionService');

describe('encryptionService', () => {
    // Test the hashPassword function
    describe('hashPassword', () => {
      it('should hash a password', async () => {
        const password = 'testPassword';
        const hashedPassword = await encryptionService.hashPassword(password);
  
        // Ensure the hashed password is not the same as the original password
        expect(hashedPassword).not.toBe(password);
      });
    });
  
    // Test the comparePassword function
    describe('comparePassword', () => {
      it('should compare passwords and return true for matching passwords', async () => {
        const password = 'testPassword';
        const hashedPassword = await encryptionService.hashPassword(password);
  
        // Ensure comparePassword returns true for matching passwords
        const isMatch = await encryptionService.comparePassword(password, hashedPassword);
        expect(isMatch).toBe(true);
      });
  
      it('should compare passwords and return false for non-matching passwords', async () => {
        const password = 'testPassword';
        const otherPassword = 'otherPassword';
        const hashedPassword = await encryptionService.hashPassword(password);
  
        // Ensure comparePassword returns false for non-matching passwords
        const isMatch = await encryptionService.comparePassword(otherPassword, hashedPassword);
        expect(isMatch).toBe(false);
      });
    });
  });