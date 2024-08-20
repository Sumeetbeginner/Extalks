
1. editProfileInfo - Request -> POST = Updated Data
                     Update -> User

2. funfuser - Request -> POST = user2_id

              Check if user already follow user2_id

              if(yes): then unfollow
              Update -> User -> Remove user2_id from following of user
              Remove userid from followers of user2

              if(no): then follow
              Update -> User -> Add user2_id to following of user
              Add user id to followers of user2
