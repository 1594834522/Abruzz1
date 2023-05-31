Page({
  data: {
    comments: [],
    inputValue: ''
  },

  onLoad: function() {
    this.getUserInfo();
  },

  getUserInfo: function() {
    const app = getApp();
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
            }
          });
        } else {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          });
        }
      }
    });
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  submitComment() {
    const app = getApp();
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '您需要登录才能进行此操作',
        icon: 'none'
      });
      return;
    }

    const { inputValue, comments } = this.data;
    if (!inputValue) return;

    const newComment = {
      text: inputValue,
      left: Math.random() * 300,
      top: Math.random() * 500,
      likes: 0,
      likedUsers: []
    };

    comments.push(newComment);
    this.setData({ comments, inputValue: '' });
  },

  likeComment(e) {
    const app = getApp();
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '您需要登录才能进行此操作',
        icon: 'none'
      });
      return;
    }

    const index = e.currentTarget.dataset.index;
    const userId = app.globalData.userInfo.nickName; // 假设使用用户昵称作为唯一标识

    if (!this.data.comments[index].likedUsers.includes(userId)) {
      this.data.comments[index].likes += 1;
      this.data.comments[index].likedUsers.push(userId);
      this.setData({ comments: this.data.comments });
    } else {
      wx.showToast({
        title: '您已经点过赞了！',
        icon: 'none'
      });
    }
  }
});
