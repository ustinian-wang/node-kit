import marked from 'marked';
// console.log("marked", marked)
export const markdownToHtml = (md) => {
    return marked(md);
}