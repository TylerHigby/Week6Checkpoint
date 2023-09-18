export class Post {
  constructor(data) {
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.likes = data.likes.length
    this.creatorName = data.creator.name
    this.creatorImg = data.creator.picture
    this.createdAt = data.createdAt
  }

}