import * as actions from '../actions/actions';

describe('Post Actions', () => {

  const id = 34;
  const date = "2018-09-17T00:05:37";
  const modified = "2018-09-17T00:05:37";
  const slug = "palm-oil";
  const title = "Palm Oil";
  const content = "<p><strong><img data-attachment-id=\"18\" data-permalink=\"https://2018zoohackathon.ajzane.com/2018/09/15/palm-oil/animal-ape-calm-52530/\" data-orig-file=\"https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=2560%2C1693&amp;ssl=1\" data-orig-size=\"2560,1693\" data-comments-opened=\"1\" data-image-meta=\"{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}\" data-image-title=\"Orangutan\" data-image-description=\"\" data-medium-file=\"https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=300%2C198&amp;ssl=1\" data-large-file=\"https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=525%2C347&amp;ssl=1\" class=\"aligncenter wp-image-18 size-full\" src=\"https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?resize=525%2C347&#038;ssl=1\" alt=\"Orangutan\" width=\"525\" height=\"347\" srcset=\"https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?w=2560&amp;ssl=1 2560w, https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?resize=300%2C198&amp;ssl=1 300w, https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?resize=768%2C508&amp;ssl=1 768w, https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?resize=1024%2C677&amp;ssl=1 1024w, https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?w=1575&amp;ssl=1 1575w\" sizes=\"(max-width: 706px) 89vw, (max-width: 767px) 82vw, 740px\" data-recalc-dims=\"1\" /></strong></p>\n<p><strong>What Is Palm Oil &amp; Where is it Sourced?</strong></p>\n<p>&#8220;Palm oil is a type of edible vegetable oil that is derived from the palm fruit, grown on the African oil palm tree. Oil palms are originally from Western Africa, but can flourish wherever heat and rainfall are abundant.&#8221; (<a href=\"http://www.saynotopalmoil.com/Whats_the_issue.php\" target=\"_blank\" rel=\"noopener\">source</a>)</p>\n<p><strong>How Is Palm Oil Used in Our Products?</strong></p>\n<p><span style=\"font-weight: 400;\">“</span><span style=\"font-weight: 400;\">In Europe and the United States palm oil is mostly used in its refined form, which is odourless and pale yellow, making it a valuable ingredient providing texture and taste for a variety of products. Refined palm oil is used as an affordable ingredient in many food products, such as margarine, confectionery, chocolate, ice cream and bakery products. It is also widely used in non-food products such as soap, candles, and cosmetics. More than half the products on sale in the supermarket are made with palm oil.&#8221; (<a href=\"https://www.palmoilandfood.eu/en/palm-oil-uses\" target=\"_blank\" rel=\"noopener\">source</a>)</span></p>\n<p><strong>Why is Palm Oil a Problem?</strong></p>\n<p>&#8220;The industry is linked to major issues such as deforestation, habitat degradation, climate change, animal cruelty and indigenous rights abuses in the countries where it is produced, as the land and forests must be cleared for the development of the oil palm plantations. According to the World Wildlife Fund, an area the equivalent size of 300 football fields of rainforest is cleared each hour to make way for palm oil production. This large-scale deforestation is pushing many species to extinction, and findings show that if nothing changes species like the orangutan could become extinct in the wild within the next 5-10 years, and Sumatran tigers less than 3 years. [&#8230;]  <span style=\"color: #424242; font-family: Arial;\">There are over 300,000 different animals found throughout the jungles of Borneo and Sumatra, many of which are injured, killed and displaced during deforestation. In addition, palm oil development increases accessibility of animals to poachers and wildlife smugglers who capture and sell wildlife as pets, use them for medicinal purposes or kill them for their body parts. The destruction of rainforests in Borneo and Sumatra is therefore not only a conservation emergency, but a major animal welfare crisis as well.</span></p>\n<p><span style=\"color: #424242; font-family: Arial;\">Wildlife such as orangutans have been found buried alive, killed from machete attacks, guns and other weaponry. Government data has shown that over 50,000 orangutans have already died as a result of deforestation due to palm oil in the last two decades. This either occurs during the deforestation process, or after the animal enters a village or existing palm oil plantation in search of food. Mother orangutans are also often killed by poachers and have their babies taken to be sold or kept as pets, or used for entertainment  in wildlife tourism parks in countries such as Thailand and Bali.</span></p>\n<p><span style=\"color: #424242; font-family: Arial;\">Other megafauna that suffer as a result of this development include species like the Sumatran Tiger, Sumatran Rhinoceros, Sun Bear, Pygmy Elephant, Clouded Leopard and Proboscis Monkey. Road networks that are constructed to allow palm oil plantation workers and equipment access to the forest also increase accessibility of these areas to poachers that are looking for these kinds of valuable animals. This allows poachers to comfortably drive to an area to sit and wait for their target where previously they may have had to trek through inaccessible areas of forest.&#8221; (<a href=\"http://www.saynotopalmoil.com/Whats_the_issue.php\" target=\"_blank\" rel=\"noopener\">source</a>) </span></p>\n<p><strong>What Should I Do?</strong></p>\n<p><span style=\"color: #424242; font-family: Arial;\">Since palm oil is so problematic for so many reasons, we do recommend avoiding it entirely.  There are many names for synonyms for &#8220;palm oil&#8221; used by product manufacturers.  This can make it difficult to determine if palm oil is being used within a given product simply by checking the ingredient list.  Conscious Consumer checks for 26 different terms associated with palm oil, and notifies you if any are present on a webpage.  Some of these terms conclusively indicate palm oil, while others only might be referencing palm oil.  If a flagged term is present, we recommend further investigation if a consumer is still interested in purchasing the product.  </span></p>\n<p><strong>Learn More:</strong></p>\n<p><a href=\"http://www.saynotopalmoil.com/Whats_the_issue.php\" target=\"_blank\" rel=\"noopener\"><span style=\"font-weight: 400;\"> Say No to Palm Oil </span></a></p>\n<p><a href=\"https://greenpalm.org/about-palm-oil/what-is-palm-oil/palm-oil-history\" target=\"_blank\" rel=\"noopener\">Palm Oil History</a></p>\n<p><a href=\"https://www.worldwildlife.org/industries/palm-oil\" target=\"_blank\" rel=\"noopener\">World Wildlife Fund&#8217;s Page on Palm Oil</a></p>\n";
  const excerpt = "<p>What Is Palm Oil &amp; Where is it Sourced? &#8220;Palm oil is a type of edible vegetable oil that is derived from the palm fruit, grown on the African oil palm tree. Oil palms are originally from Western Africa, but can flourish wherever heat and rainfall are abundant.&#8221; (source) How Is Palm Oil Used in Our Products? “In Europe and the United States palm &hellip; </p>\n<p class=\"link-more\"><a href=\"https://2018zoohackathon.ajzane.com/2018/09/15/palm-oil/\" class=\"more-link\">Continue reading<span class=\"screen-reader-text\"> &#8220;Palm Oil&#8221;</span></a></p>\n";
  const categories = [ 4, 45 ];
  const jetpack_featured_media_url = "https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=2560%2C1693&ssl=1";

  it('should create an action to add a post', () => {

    const isActive = false;

    const expectedAction = {
      type: actions.ADD_POST,
      categories,
      content,
      date,
      excerpt,
      id,
      jetpack_featured_media_url,
      modified,
      slug,
      title,
      isActive
    };

    expect(
      actions.addPost(
        categories,
        content,
        date,
        excerpt,
        id,
        jetpack_featured_media_url,
        modified,
        slug,
        title,
      )
    ).toEqual(expectedAction)
  });


  it('should create an action to add a post with isActive: true', () => {

    const isActive = true;

    const expectedAction = {
      type: actions.ADD_POST,
      categories,
      content,
      date,
      excerpt,
      id,
      jetpack_featured_media_url,
      modified,
      slug,
      title,
      isActive
    };

    expect(
      actions.addPost(
        categories,
        content,
        date,
        excerpt,
        id,
        jetpack_featured_media_url,
        modified,
        slug,
        title,
        true
      )
    ).toEqual(expectedAction)
  });

  it('should create an action to toggle post active', () => {

    const expectedAction = {
      type: actions.TOGGLE_POST,
      postId: 34
    };

    expect(
      actions.togglePost(34)
    ).toEqual(expectedAction)
  });
});
