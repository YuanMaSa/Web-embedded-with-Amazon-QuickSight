var athena = new AWS.Athena();
var sql = "WITH sentiment AS (
  SELECT
    contactid
    ,talker
    ,text
    ,sentiment
    ,calltime
    ,keyphrases
  FROM
    "comprehendgluedatabase-wcdcyfh4mjgu"."sentiment_analysis"
)

SELECT
  contactid
  ,talker
  ,transcript
  ,keyphrases[1].keyphrases as key
  ,sentimentresult.sentiment
  ,sentimentresult.sentimentscore.positive
  ,sentimentresult.sentimentscore.negative
  ,sentimentresult.sentimentscore.mixed
  ,sentimentresult.sentimentscore.neutral
  ,calltime
FROM
  sentiment
  CROSS JOIN UNNEST(text) as t(transcript)
  CROSS JOIN UNNEST(sentiment) as t(sentimentresult)
order by calltime DESC"
var params = {
  QueryString: sql
};
athena.getQueryExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
