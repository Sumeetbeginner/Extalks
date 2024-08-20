
1. editProfileInfo - Request -> POST = Updated Data
                     Update -> User

2. funfuser - Request -> POST = user2_id

              1. Check if user already follow user2_id

              2. if(yes): then unfollow
              Update -> User -> Remove user2_id from following of user
              Remove userid from followers of user2

              3. if(no): then follow
              Update -> User -> Add user2_id to following of user
              Add user id to followers of user2

3. profileview : Request => GET = user2_id through params
                 
                 1. Find User by ID

                 2. If user2 profileViews Length if less than 10
                    => push user1 id

                 3. Else => Remove oldest value and then push user1 id

                 4. Return user2 data to user1

4. askQuestion : Request => POST = questionInfo 
                 
                 1. Create New Question

                 2. Update user.questAsk -> newQuestion ID

