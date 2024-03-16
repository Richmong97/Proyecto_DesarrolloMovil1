import React, { createContext, useState } from 'react';

const ProfileContext = createContext({
  profile: {
    name: '',
    email: '',
    // Additional profile details
    typesCocina: [], // Array of cuisine types (optional)
    minPrice: 0, // Minimum price preference (optional)
    maxPrice: 100, // Maximum price preference (optional)
    distance: 10, // Preferred distance for restaurants (optional)
  },
  updateProfile: () => {}, // Function to update profile
});

export default ProfileContext;
