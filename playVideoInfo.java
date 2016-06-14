public class bk
{
  public static boolean a(String paramString1, String paramString2)
  {
    return a(paramString1, null, paramString2);
  }

  public static boolean a(String paramString1, String paramString2, String paramString3)
  {
    String str = "" + paramString1 + "881fd5a8c94b4945b46527b07eca2431";
    long l = System.currentTimeMillis();
    str = b(String.valueOf(l), str);
    if (paramString3 != null)
      try
      {
        paramString1 = new HttpGet("http://" + paramString3 + ":6095/controller?action=play&type=video&url=" + Uri.encode(paramString1) + "&title=" + paramString2 + "&apikey=" + "881fd5a8c94b4945b46527b07eca2431" + "&ts=" + String.valueOf(l) + "&sign=" + str);
        paramString1 = new DefaultHttpClient().execute(paramString1);
        Log.i("VideoUtil", "resCode = " + paramString1.getStatusLine().getStatusCode());
        Log.i("VideoUtil", "result = " + EntityUtils.toString(paramString1.getEntity(), "utf-8"));
        return true;
      }
      catch (Exception paramString1)
      {
        Log.i("VideoUtil", "Exception:" + paramString1);
      }
    return false;
  }

  private static String b(String paramString1, String paramString2)
  {
    return l.a("mitvsignsalt" + paramString2 + paramString1.substring(paramString1.length() - 5));
  }
}
