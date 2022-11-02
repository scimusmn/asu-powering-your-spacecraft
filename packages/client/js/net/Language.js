define(
  ['net/AppData'],
  function(AppData) {

    //Track current language
    Language.translationXML = {};
    Language.currentLanguage = '';

    // Hack to wait for app start      
    setTimeout(function () {
      console.log(AppData.activeLanguages);
      // Set to default (first) language
      Language.setLanguageByOrder(1);
    }, 5500);

    function Language() {

    }

    /* setupTranslations() | Accepts xml to be searched. */
    Language.setupTranslations = function(xml) {
      Language.translationXML = xml;
    };

    /* setLanguageByOrder() */
    Language.setLanguageByOrder = function(orderNum) {

      const languageKey = AppData.activeLanguages.find(language => parseInt(language.order) === orderNum).key;

      this.setLanguage(languageKey)

    };

    /* setLanguage() | Find and replace all text by translation ids */
    Language.setLanguage = function(languageId) {

      Language.currentLanguage = languageId;

      //Find all swappable language
      $('#wrapper').find('p,h1,h2,h3,span').each(function() {

        Language.refreshTranslation(this);

      });

    };

    Language.refreshTranslation = function(translateElement) {

      //Retrieve translation text from translation xml
      var translationId = $(translateElement).attr('id');
      var translationText = Language.getTranslation(translationId);

      //Apply to html
      if (translationText != '') $(translateElement).html(translationText);

    };

    Language.getTranslation = function(translationId) {

      return $(Language.translationXML).find('text[id="' + translationId + '"]').children(Language.currentLanguage).first().text();

    };

    /* getCurrentLanguage() | Return the current displayed language key. */
    Language.getCurrentLanguage = function() {

      return Language.currentLanguage;

    };

    return Language;

  }

);
