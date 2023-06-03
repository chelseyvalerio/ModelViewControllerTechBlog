module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },

    format_summary: (content) => {
    if(content.length > 250) {
        return content.substring(0, 250) + "...";
    } else {
        return content;
    }
}
};


    // format_amount: (amount) => {
    //   // format large numbers with commas
    //   return parseInt(amount).toLocaleString();
    // },
    // get_emoji: () => {
    //   const randomNum = Math.random();
  
    //   // Return a random emoji
    //   if (randomNum > 0.7) {
    //     return `<span for="img" aria-label="lightbulb">💡</span>`;
    //   } else if (randomNum > 0.4) {
    //     return `<span for="img" aria-label="laptop">💻</span>`;
    //   } else {
    //     return `<span for="img" aria-label="gear">⚙️</span>`;
    //   }
    // },
  