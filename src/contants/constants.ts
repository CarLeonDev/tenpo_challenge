/**
 * Base URL for the FakerAPI service used to fetch mock data
 */
export const API_URL = 'https://fakerapi.it/api/v2';

/**
 * Number of persons to fetch in a single API request
 */
export const PERSON_FETCH_SIZE = 100;

/**
 * Total number of persons available in the mock database
 */
export const PERSON_TOTAL_COUNT = 2000;

/**
 * Mock authentication token for testing purposes
 */
export const FAKE_TOKEN = "fdc32567-4567-4567-4567-456745674567";

/**
 * Mock user credentials for testing authentication
 */
export const FAKE_USER = {
  name: "Test User",
  email: "test@test.com",
  password: "test",
};
