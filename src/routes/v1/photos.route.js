const express = require('express')
const router = express.Router()
const { authentication } = require('../../middlewares/auth')
const photoController = require('../../controllers/photo.controller')
//schemas
/**
 * @swagger
 * definitions:
 *   photo:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *         required: false
 *       privacy:
 *          type: string
 *          required: false
 *       tags:
 *          required: false
 *          type: array
 *          items:
 *              type: string
 *       peopleTags:
 *          type: array
 *          items:                  
 *             $ref: "#/definitions/tagPeople"
 *       file:
 *          type: string
 *       
 *   tagPeople:
 *     type: object
 *     properties:
 *        tagged:
 *          type: array
 *          items:
 *              type: string   
 *        tagging:
 *          type: integer
 *        createdAt:
 *          type: integer
 * 
 *   tagged:
 *     type: object
 *     properties:
 *        tagged:
 *          type: array
 *          items:
 *              type: string  
 *
 */
/**
 * @swagger
 *  /photo:
 *   post:
 *     description: Add photo
 *     tags: [Photo]
 *     parameters:
 *       - name: title
 *         in: body
 *         required: false
 *         description: photo's title
 *         schema:
 *       - name: description
 *         in: body
 *         required: false
 *         description: photo's description
 *         schema:
 *       - name: privacy
 *         in: body
 *         required: false
 *         description: photo's privacy
 *         schema:
 *       - name: tags
 *         in: body
 *         required: false
 *         description: photo's tags
 *         schema:
 *       - name: peopleTags
 *         in: body
 *         required: false
 *         description: photo's tagged people
 *         schema: 
 *       - name: file
 *         in: body
 *         required: true
 *         description: photo's file
 *         schema:
 *           $ref: "#/definitions/photo"
 *     responses:
 *       200:
 *         description: photo added successfully
 *         schema:
 *           $ref: "#responses/user_photo"
 *       401:
 *         description: Unauthorized
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "Unauthorized request",
 *            }
 *       400:
 *         description: Bad request or file type
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "Bad request or file type",
 *            }
*       500:
 *         description: internal server error
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "Internal server error",
 *            }
 */

router.post('/', authentication, photoController.upload.single("photo"), photoController.addPhoto)



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *  /photo/peopletag/{photo_id}:
 *   post:
 *     description: Tag other people in a photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: url
 *         required: true
 *         description: photo id
 *         type: id
 *         schema:
 *       - name: tagged
 *         required: true
 *         description: Array of the usernames people that are being tagged
 *         in: body
 *         type : string
 *         schema:
 *           $ref: '#/definitions/tagged'
 *     responses:
 *           200:
 *             description: Tag added successfully
 *             schema:
 *               $ref: "#responses/user_photo"
 *           401:
 *             description: Unauthorized
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Unauthorized request",
 *                }
 *           400:
 *             description: Bad request
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Bad request",
 *                }
 *           500:
 *             description: internal server error
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Internal server error",
 *                }
 */

router.post('/peopletag/:id', authentication, photoController.tagPeople);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *  /photo/peopletag/{photo_id}:
 *   delete:
 *     description: Remove tagged person in a photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: url
 *         required: true
 *         description: photo id
 *         type: id
 *         schema:
 *       - name: tagged
 *         required: true
 *         description: Array of the usernames people that are being removed
 *         in: body
 *         type : string
 *         schema:
 *           $ref: '#/definitions/tagged'
 *     responses:
 *           200:
 *             description: Tag removed successfully
 *             schema:
 *               $ref: "#responses/user_photo"
 *           401:
 *             description: Unauthorized
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Unauthorized request",
 *                }
 *           400:
 *             description: Bad request
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Bad request",
 *                }
 *           500:
 *             description: internal server error
 *             examples:
 *              application/json:
 *  
 *                {
 *                         "error": "Internal server error",
 *                }
 */

 router.delete('/peopletag/:id', authentication, photoController.removeTagPeople);
 ////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////


// /**
//  * @swagger
//  * /photo:
//  *   get:
//  *     description: Get all the user's photos.
//  *     tags: [Photo]
//  *     responses:
//  *       200:
//  *         description: Success
//  *         schema:
//  *            type: array
//  *            items:
//  *              $ref: '#/responses/user_photo'
//  *       401:
//  *         description: Unauthorized request
//  *         examples:
//  *          application/json:
//  *
//  *            {
//  *                     "error": "Unauthorized",
//  *            }
//  *       500:
//  *        description: internal server error
//  *        examples:
//  *         application/json:
//  *  
//  *           {
//  *                    "error": "Internal server error",
//  *           }
//  *
//  */

router.get('/', authentication, photoController.getUserPhotos)

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


/**
 * @swagger
 * /photo/home:
 *   get:
 *     description: Return list of photos in home, The photos of the people you are following.
 *     tags: [Photo]
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *            type: array
 *            items:
 *             $ref: "#responses/user_photo"
 *
 *       404:
 *         description: Not found
 *
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "photos not found",
 *            }
 *       500:
 *         description: internal server error
 *         examples:
 *          application/json:
 *  
 *            {
 *                     "error": "Internal server error",
 *            }
 */

 router.get('/home',authentication, photoController.getPhotosHome)

 ///////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////

 /**
 * @swagger
 * /photo/explore:
 *   get:
 *     description: Return list of photos in explore, The photos of the people with Fav more than 20.
 *     tags: [Photo]
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *            type: array
 *            items:
 *             $ref: "#responses/user_photo"
 *
 *       404:
 *         description: Not found
 *
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "photos not found",
 *            }
 *       500:
 *         description: internal server error
 *         examples:
 *          application/json:
 *  
 *            {
 *                     "error": "Internal server error",
 *            }
 */

  router.get('/explore',authentication, photoController.getPhotosExplore)

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /{photo_id}/comments:
 *   get:
 *     description: return list of comments for a given photo.
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo id to get comments for the corresponding photo
 *         schema:
 *           type: integer
 *
 * 
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *              [
 *                  {
 *                     "comment": "comment title",
 *                     "_id": "123456",
 *                     "user": {
 *                                  "Fname":"John",
 *                                  "Lname":"Smith"
 *                             },
 *                     "createdAt":"2020-5-23",
 *                     "updatedAt":"2021-4-2"
 *                  }
 *              ]
 *
 *       404:
 *         description: Not found
 *
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photos not found",
 *            }
 *       401:
 *         description: invalid token
 *
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Invalid token",
 *            }
 *
 *
 */

router.get('/:photoId/comments', authentication, photoController.getComments);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 *  /photo/{photo_id}:
 *   delete:
 *     description: Delete a photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo id to add tag to the corresponding photo
 *         schema:
 *           type: integer
 * 
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo deleted successfully",
 *            }
 *       401:
 *         description: Unauthorized
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Unauthorized request",
 *            }
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 */

router.delete('/delete/:photo_id', (req, res) => { })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /{photo_id}/comments:
 *   post:
 *     description: Add comment to photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo id to add comment to the corresponding photo
 *         schema:
 *           type: integer
 *       - name: comment
 *         in: body
 *         required: true
 *         description: comment added to the corresponding photo
 *         type: object
 *         properties:
 *           comment:
 *             type: string
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *            {
 *                     "message": "success"
 *            }
 *         
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Unauthorized",
 *            }
 *
 */

router.post('/:photoId/comments', authentication, photoController.addComment);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /{photo_id}/comments/{comment_id}:
 *   put:
 *     description: edit comment on a given photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo id to edit its comment 
 *         schema:
 *           type: integer
 *       - name: comment_id
 *         in: path
 *         required: true
 *         description: comment id to edit it
 *         schema:
 *           type: integer
 *
 *     properties:
 *           comment:
 *             type: string
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *            {
 *                     "message": "comment updated"
 *            }
 *         
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 *          
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Unauthorized",
 *            }
 *       403:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Access denied",
 *            }
 *
 */

router.put('{photo_id}/comment', (req, res) => { })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @swagger
 * /photo/{photo_id}:
 *   put:
 *     description: change photo mode between { private public friends}
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo_id to edit it
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         required: true
 *         description: edit photo object
 *         type: object
 *         properties:
 *           title:
 *             type: string 
 *           privacy:
 *             type: string 
 *           description:
 *             type: string 
 *     responses:
 *       200:
 *         description: Success
 *
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "updated successfully",
 *            }
 *
 *
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "not found",
 *            }
 *       401:
 *         description: bad request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "unauthorized request.",
 *            }
 *
 *
 */

router.put('/photo/{photo_id}', (req, res) => { })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /photo/{photo_id}/comments/{comment_id}:
 *   delete:
 *     description: delete comment from a photo
 *     tags: [Photo]
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         required: true
 *         description: comment_id to delete a comment from a photo
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo_id to delete a comment from it
 *
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Success",
 *            }
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 *
 *       401:
 *         description: Invalid token
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Invalid token",
 *            }
 *       403:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Access denied",
 *            }
 *          
 *
 */

router.delete('/:photoId/comments/:commentId', authentication, photoController.deleteComment)
///////////////////////////////////////////////////////////////////////////////////////


/**
 * @swagger
 * /photo/tag/{photo_id}:
 *   delete:
 *     description: Delete a tag from a photo
 *     tags: [Photo]
 *     parameters:
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: The id of the photo that the tag will be removed from
 *       - name: tag
 *         in: body
 *         required: true
 *         description: the tag that you want to add
 *         schema:
 *           type: object
 *           properties:
 *              tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Tag removed successfully",
 *            }
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "photo not found",
 *            }
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "Unauthorized",
 *            }
 *       500:
 *         description: internal server error
 *         examples:
 *          application/json:
 *  
 *            {
 *                     "error": "Internal server error",
 *            }
 */

router.delete('/photo//tag/:id', authentication, photoController.removeTag)

///////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /photo/tag:
 *   post:
 *     description: Add a tag to multiple photos
 *     tags: [Photo]
 *     parameters:
 *       - name: photos_ids
 *         in: body
 *         required: true
 *         description: the photos ot which you want to add the tag for
 *         schema:
 *       - name: tag
 *         in: body
 *         required: true
 *         description: the tag that you want to add
 *         schema:
 *           type: object
 *           properties:
 *              photos: 
 *                 type: array
 *                 items:
 *                   type: integer
 *              tag:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Tag added successfully",
 *            }
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "photo not found",
 *            }
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "error": "Unauthorized",
 *            }
 *       500:
 *         description: internal server error
 *         examples:
 *          application/json:
 *  
 *            {
 *                     "error": "Internal server error",
 *            }
 */

 router.post('/photo//tag/',authentication, photoController.addTag)

 //////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /photo/{photo_id}:
 *   get:
 *     description: get a photo by id
 *     tags: [Photo]
 *     parameters:
 *
 *       - name: photo_id
 *         in: path
 *         required: true
 *         description: photo id
 *
 *     responses:
 *       200:
 *         description: Success
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Success",
 *            }
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Unauthorized",
 *            }
 *
 */

router.get('/photo/:photo_id', (req, res) => { })

/**
 * @swagger
 * /photo/{title}:
 *   get:
 *     description: get a photo by title
 *     tags: [Photo]
 *     parameters:
 *
 *       - name: photo_title
 *         in: path
 *         required: true
 *         description: photo id
 *
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/responses/photo'
 *       404:
 *         description: Not found
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "photo not found",
 *            }
 *       401:
 *         description: Unauthorized request
 *         examples:
 *          application/json:
 *
 *            {
 *                     "message": "Unauthorized",
 *            }
 *
 */

router.get('/photo/:photo_id', (req, res) => { })

/**
 * @swagger
 * responses:
 *   photo:
 *     type: object
 *     properties:
 *       photo_id:
 *         type: integer
 *       photoUrl:
 *         type: string
 *       photo_owner_id:
 *         type: integer
 *       tag:
 *         type: array
 *         items:
 *           $ref: '#/responses/tag'
 *       comment:
 *         type: array
 *         items:
 *           $ref: '#/responses/comment'
 *       description:
 *         type: string
 *   comment:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       comment:
 *         type: string
 *       photo_id:
 *         type: integer
 *       commented_user_id:
 *         type: integer
 *       userName:
 *          typre:string
 *       createdAt:
 *          type:date
 *       updatedAt:
 *          type:date
 *   tag:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       comment:
 *         type: string
 *       photo_id:
 *         type: integer
 *       taged_user_id:
 *         type: integer
 *
 *   user_photo:
 *     type: object
 *     properties:
 *       _id:
 *         type: integer
 *       title:
 *          type: string
 *       description:
 *          type: string
 *       photoUrl:
 *         type: string
 *       privacy:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *            type: string
 *       peopleTags:
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *              tagged:
 *                type: array
 *                items:
 *                  type: string
 *              tagging:
 *                type: integer
 *              _id:
 *                type: integer
 *       createdAt:
 *         type: integer
 *       
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

module.exports = router