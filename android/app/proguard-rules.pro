# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# react-native-config
-keep class com.galicia.otp.BuildConfig { *; }

# react-native-reanimated v2
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# react-native-svg-icon
-keep public class com.horcrux.svg.** {*;}

# cyxtera
-dontwarn net.easysol.shortcuts.** 
-dontwarn net.easysol.did.** 
-dontwarn net.easysol.faceid.authenticator.** 
-dontwarn net.easysol.liveness.** 
-dontwarn net.easysol.faceid_detector_sdk.** 
-dontwarn net.easysol.jni.dlib.** 
-dontwarn net.easysol.mobile.commos.** 
-dontwarn com.cyxtera.did.sdk.data.** 
-dontwarn com.cyxtera.did.sdk.tokens.** 
-dontwarn com.cyxtera.did.sdk.encryptor.** 
-dontwarn com.cyxtera.did.sdk.offline.**

-keep class net.easysol.shortcuts.** {*;} 
-keep class net.easysol.did.** {*;} 
-keep class net.easysol.faceid.authenticator.** {*;} 
-keep class net.easysol.liveness.** {*;} 
-keep class net.easysol.faceid_detector_sdk.** {*;} 
-keep class net.easysol.jni.dlib.** {*;} 
-keep class net.easysol.mobile.commos.** {*;} 
-keep class com.cyxtera.did.sdk.data.** {*;} 
-keep class com.cyxtera.did.sdk.tokens.** {*;} 
-keep class com.cyxtera.did.sdk.encryptor.** {*;} 
-keep class com.cyxtera.did.sdk.offline.** {*;}

-dontwarn com.google.errorprone.annotations.** 
-dontwarn androidx.annotation.**

# Crashlytics
-keep public class * extends java.lang.Exception
-keepattributes LineNumberTable,SourceFile,Signature
-renamesourcefileattribute SourceFile
-keep class com.google.android.gms.measurement.AppMeasurement { *; }
-keep class com.google.android.gms.measurement.AppMeasurement$OnEventListener { *; }
-keep class com.crashlytics.** { *; }
-dontwarn com.crashlytics.**

-keep class com.adobe.marketing.mobile.* {
    <init>(...);
 }