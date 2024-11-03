
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CardData = () => {
    const [userCount, setUserCount] = useState(null);
    const [animalCount, setanimalCount] = useState(null);
    
    useEffect(() => {
        const fetchUserCount = async () => {
          try {
            const response = await axios.get('http://localhost:8082/api/user-count');
            setUserCount(response.data.count);
          } catch (error) {
            console.error('Error fetching user count:', error);
          }
        };
    
        fetchUserCount();
      }, []);

      useEffect(() => {
        const fetchUserCount = async () => {
          try {
            const response = await axios.get('http://localhost:8082/api/animal-count');
            setanimalCount(response.data.count);
          } catch (error) {
            console.error('Error fetching user count:', error);
          }
        };
    
        fetchUserCount();
      }, []);
       

    return (
        <div class="flex flex-col sm:flex-row gap-6 p-4">
            {/* <!-- Card 1 --> */}
            <div class="flex-1 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h2 class="text-xl font-semibold mb-2">Users</h2>
                <p class="text-gray-600 mb-4 flex gap-4">
                    Total number of users : <h1>{userCount !== null ? userCount : 'Loading...'}</h1>
                </p>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Learn More
                </button>
            </div>

            {/* <!-- Card 2 --> */}
            <div class="flex-1 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h2 class="text-xl font-semibold mb-2">Animals</h2>
                <p class="text-gray-600 mb-4 flex gap-4">
                    Total number of animals <h1>{animalCount !== null ? animalCount : 'Loading...'}</h1>
                </p>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Learn More
                </button>
            </div>
        </div>

    )
}

export default CardData