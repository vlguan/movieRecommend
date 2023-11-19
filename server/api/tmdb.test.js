// Import the movieQuery function
const { movieQuery } = require('./tmdb');

// Mock the global fetch function for testing
global.fetch = jest.fn();

describe('movieQuery', () => {
  it('fetches successfully data from an API', async () => {
    const mockResponse = {
        "page": 1,
        "results": [
          {
            "adult": false,
            "backdrop_path": "/Ag6qhzsJd3k1NKuNrG9RmhZDMh7.jpg",
            "genre_ids": [
              18,
              80
            ],
            "id": 640,
            "original_language": "en",
            "original_title": "Catch Me If You Can",
            "overview": "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit.",
            "popularity": 73.468,
            "poster_path": "/ctjEj2xM32OvBXCq8zAdK3ZrsAj.jpg",
            "release_date": "2002-12-16",
            "title": "Catch Me If You Can",
            "video": false,
            "vote_average": 7.973,
            "vote_count": 14542
          },
          {
            "adult": false,
            "backdrop_path": "/bhZ4Lg4ai4RLLYb2nWzWQfN4LMF.jpg",
            "genre_ids": [
              28,
              35,
              18
            ],
            "id": 34745,
            "original_language": "en",
            "original_title": "Catch Me If You Can",
            "overview": "A hotshot teenage car racer persuades the class president of a small Minnesota high school to gamble on illegal car races to raise money for their school which is facing closure.",
            "popularity": 2.849,
            "poster_path": "/b05zKxfURZDsET0zmoK8igVmChI.jpg",
            "release_date": "1989-10-14",
            "title": "Catch Me If You Can",
            "video": false,
            "vote_average": 5.5,
            "vote_count": 5
          },
          {
            "adult": false,
            "backdrop_path": "/xgSThvwKOrhr0q0b0YkgTHWkx4I.jpg",
            "genre_ids": [
              53,
              80,
              10751,
              10770
            ],
            "id": 107309,
            "original_language": "en",
            "original_title": "Catch Me If You Can",
            "overview": "When a 12 year old boy with an attitude witnesses a mob killing, the job of protecting him falls to a down-on-his luck cop.",
            "popularity": 4.37,
            "poster_path": "/olFOmvAqEp6Y3qYBjHFvRvQTWig.jpg",
            "release_date": "1998-12-11",
            "title": "Catch Me If You Can",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 2
          },
          {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
              99
            ],
            "id": 459682,
            "original_language": "en",
            "original_title": "Catch Me If You Can: Behind the Camera",
            "overview": "A behind-the-scenes look at the making of Stephen Spielberg's \"Catch Me If You Can.\"",
            "popularity": 5.624,
            "poster_path": "/dW0ufGS32gimuicgzvf7P0YTSHf.jpg",
            "release_date": "2003-05-06",
            "title": "Catch Me If You Can: Behind the Camera",
            "video": false,
            "vote_average": 8.4,
            "vote_count": 22
          }
        ],
        "total_pages": 1,
        "total_results": 4
      };

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Replace with the actual query you want to test
    const query = 'Catch Me If You Can';

    // Invoke the function and await the result
    const data = await movieQuery(query);
    // Assert that the function returns the correct response
    expect(data).toEqual(mockResponse);

    // You can add more assertions based on your requirements
  });

  it('handles errors gracefully', async () => {
    const mockErrorResponse = {
      status: 500, // Replace with the desired HTTP error status
    };

    fetch.mockResolvedValue({
      ok: false,
      status: mockErrorResponse.status,
      json: jest.fn().mockResolvedValue({
        // Your error response structure if needed
      }),
    });

    // Replace with the actual query you want to test
    const query = '';

    // Invoke the function and await the result
    // console.log(movieQuery(query))
    await expect(movieQuery(query)).rejects.toThrow(
      `HTTP error! Status: ${mockErrorResponse.status}`
    );

    // You can add more assertions based on your requirements
  });
});
