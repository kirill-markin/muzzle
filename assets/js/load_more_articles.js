function toggleMoreArticles() {
  const hiddenMentions = document.querySelectorAll(".hidden-mention");
  hiddenMentions.forEach((mention) => {
    mention.style.display = "flex";
  });
  document.getElementById("load-more-btn").style.display = "none";
}
