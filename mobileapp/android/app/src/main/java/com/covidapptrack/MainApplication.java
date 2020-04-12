package com.covidapptrack;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.wonday.pdf.RCTPdfView;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import superinfotech.suraj.reactnativepayumoney.PayumoneyPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTPdfView(),
            new DocumentPickerPackage(),
            new PickerPackage(),
            new RNFusedLocationPackage(),
            new PayumoneyPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new AsyncStoragePackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSpinkitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
