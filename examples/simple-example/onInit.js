// Sets the text from customProperties
const htmlgraphicsText = htmlNode.getElementById('htmlgraphics-text');

if (htmlgraphicsText) {
  htmlgraphicsText.textContent = customProperties.text;

  // Change the text color based on the theme
  if (theme.isDark) {
    htmlgraphicsText.style.color = 'green';
  } else {
    htmlgraphicsText.style.color = 'red';
  }
}
