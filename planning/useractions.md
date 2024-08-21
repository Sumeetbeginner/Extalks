
0. Register and Login 

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

5. followQuestion : Request => POST = questionId
                    
              1. Check if user already follow question

              2. if(yes): then unfollow
              Update -> User -> Remove questionId from questFollow of user
              Remove userid from questFollowC of Question

              3. if(no): then follow
              Update -> User -> Add userid to questFollowC of question
              Add questionid to questFollow of user

6. viewQuestion : Request => GET = question_id from params
                  
                  Return Question, Its all answers and user who asked the question

7. ansQuestion : POST => answerDetails
                 
                 Create New Answer
                 Save it
                 Find user and save ans id in questAns
                 Find question and save ans id in questAns

8. upvoteAns : POST => answerId

               Find Answer
               add user if in upvote if already no exists
               remove user from upvote if aleady exists

9. downvoteAns :

10. viewAns : 

11. commentAns :

12. upvoteComment :

13. viewComment :

14. sendReport :



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

