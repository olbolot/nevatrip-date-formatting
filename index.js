const translate = ( string, lang ) => {
  const translations = {
    en: {
      'В ночь с': 'on the night of',
      'на': 'to',
    },
    ru: {
      'В ночь с': 'В ночь с',
      'на': 'на',
    },
    de: {
      'В ночь с': 'in der Nacht vom ',
      'на': 'auf den',
    },
    cs: {
      'В ночь с': 'V noci od',
      'на': 'do',
    }
  };

  return translations[ lang ][ string ];
}

const renderTime = ( date, lang = 'en' ) => {
  if ( !date ) return;
  return date.toLocaleTimeString( lang, { hour: '2-digit', minute: '2-digit' } );
};

 const renderDate = ( date, lang = 'en' ) => {
  if ( !date ) return;

   const local = {
     'en': 'en-US',
     'de': 'de-DE',
     'cs': 'cs-CS',
     'ru': 'ru-RU',
   };
  const hours = date.getHours();
  const optionsWithoutYear = { day: 'numeric', month: 'long' };
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const newDay = new Date( date );
  const langFormat = local[ lang ] || local[ 'en' ];

  /* Если выбранное время находится в промежутке с 21 вечера до 4 часов ночи, то выводится дата в формате "в ночь с... на...". */
  if ( hours > 21 ) {
    const nextDay = newDay.setDate( date.getDate() + 1 );

    return `${ translate( 'В ночь с', lang ) }
      ${ new Intl.DateTimeFormat( langFormat, optionsWithoutYear ).format( date ) }
      ${ translate( 'на', lang ) }
      ${ new Intl.DateTimeFormat( langFormat, options ).format( nextDay ) }`;
  } else if ( hours < 4 || hours === '0' ) {
    const prevDay = newDay.setDate( date.getDate() - 1 );

    return `${ translate('В ночь с', lang ) }
      ${ new Intl.DateTimeFormat( langFormat, optionsWithoutYear ).format( prevDay ) }
      ${ translate('на', lang ) }
      ${ new Intl.DateTimeFormat( langFormat, options ).format( date ) }`;
  }

  return new Intl.DateTimeFormat( langFormat, options ).format( date );
};

module.exports = { renderTime, renderDate };