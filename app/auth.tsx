import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

const SCREEN_W = Dimensions.get('window').width;
// 2.5× makes colour zones denser within the swept range
const CANVAS_W = SCREEN_W * 2.5;
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type Mode = 'signin' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>('signin');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const switchMode = (next: Mode) => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setMode(next);
  };

  const handleAuth = async () => {
    if (mode === 'signup' && !displayName.trim()) {
      Alert.alert('Missing field', 'Please enter your name.');
      return;
    }
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password too short', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) Alert.alert('Sign in failed', error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { display_name: displayName.trim() } },
      });
      if (error) {
        Alert.alert('Sign up failed', error.message);
      } else if (!data.session) {
        Alert.alert(
          'Check your email',
          'We sent a confirmation link to ' + email.trim() + '. Click it to activate your account.',
          [{ text: 'OK', onPress: () => switchMode('signin') }]
        );
      }
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <WindGradientBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* ── Hero: flexible, compresses when keyboard opens ── */}
        <View style={[s.hero, { paddingTop: insets.top + 16 }]}>
          <Text style={s.wordmark}>Wherely</Text>
          <Text style={s.displayHeadline}>{'Discover\nyour world.'}</Text>
          <Text style={s.tagline}>Your daily discovery companion</Text>
        </View>

        {/* ── Form card — frosted surface panel ── */}
        <View style={[s.formCard, { paddingBottom: Math.max(insets.bottom + 8, 24) }]}>
          <Text style={s.modeLabel}>
            {mode === 'signin' ? 'Welcome back' : 'Get started'}
          </Text>
          <Text style={s.formHeadline}>
            {mode === 'signin' ? 'Sign in' : 'Create your account'}
          </Text>

          <View style={{ gap: 10, marginTop: 18 }}>
            {mode === 'signup' && (
              <GhostField label="Your name">
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Jane Smith"
                  placeholderTextColor="rgba(92,96,90,0.38)"
                  autoCapitalize="words"
                  returnKeyType="next"
                  style={s.input}
                />
              </GhostField>
            )}

            <GhostField label="Email">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="rgba(92,96,90,0.38)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                style={s.input}
              />
            </GhostField>

            <GhostField label="Password">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(92,96,90,0.38)"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleAuth}
                style={[s.input, { flex: 1 }]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                style={s.eyeButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#5c605a"
                />
              </TouchableOpacity>
            </GhostField>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.85}
            style={{ marginTop: 18 }}
          >
            <LinearGradient
              colors={['#506359', '#44564d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[s.ctaButton, { opacity: loading ? 0.65 : 1 }]}
            >
              <Text style={s.ctaLabel}>
                {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Google sign-in placeholder — logic wired later via Supabase OAuth */}
          <TouchableOpacity style={s.googleButton} activeOpacity={0.75}>
            <AntDesign name="google" size={16} color="#5c605a" />
            <Text style={s.googleLabel}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Mode toggle */}
          <View style={s.toggleRow}>
            <Text style={s.toggleText}>
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <TouchableOpacity
              onPress={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
            >
              <Text style={s.toggleAction}>
                {mode === 'signin' ? ' Sign up' : ' Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Animated wind-gradient background ──────────────────────────────────────
// A single canvas 3× the screen width holds the horizontal gradient.
// Animating its translateX pans a window of continuous colour across the
// screen — no splits, no edges, just a smooth horizontal colour flow.
// Both animations run entirely on the native thread via Reanimated.
function WindGradientBackground() {
  // Canvas starts centred (-SCREEN_W so the middle third is visible on mount)
  const BASE_LEFT = -SCREEN_W;

  // Primary pan: the wide canvas moves left/right
  const panX = useSharedValue(0);
  // Shimmer: a lighter, shorter canvas moving slightly faster in the opposite direction
  const shimmerX = useSharedValue(0);

  useEffect(() => {
    const sin = (ms: number) => ({ duration: ms, easing: Easing.inOut(Easing.sin) });

    // Pan ±55% of screen width — wider sweep to traverse more colour zones
    panX.value = withRepeat(withTiming(SCREEN_W * 0.55, sin(10000)), -1, true);

    // Shimmer drifts the other way on a slightly different beat
    shimmerX.value = withDelay(
      1600,
      withRepeat(withTiming(-SCREEN_W * 0.4, sin(13000)), -1, true),
    );
  }, []);

  const panStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: panX.value }],
  }));
  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: '#5a8272', overflow: 'hidden' }]}
      pointerEvents="none"
    >
      {/* Primary canvas — horizontal sage → cream → sage colour flow */}
      <Animated.View
        style={[{ position: 'absolute', top: 0, bottom: 0, left: BASE_LEFT, width: CANVAS_W }, panStyle]}
      >
        <LinearGradient
          colors={[
            '#4d7a6a',   // medium-dark sage
            '#7aaa97',   // medium sage
            '#d3e7db',   // primary-container (lightest)
            '#7aaa97',   // medium sage
            '#4d7a6a',   // medium-dark sage
          ]}
          locations={[0, 0.22, 0.5, 0.78, 1]}
          start={{ x: 0, y: 0.1 }}  // ~14° diagonal — breaks vertical banding on Android
          end={{ x: 1, y: 0.9 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Shimmer layer — light mint highlight drifting the other way, no white */}
      <Animated.View
        style={[
          { position: 'absolute', top: 0, bottom: 0, left: BASE_LEFT * 0.7, width: CANVAS_W * 0.85, opacity: 0.5 },
          shimmerStyle,
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(160,220,192,0.50)',
            'rgba(160,220,192,0.45)',
            'transparent',
          ]}
          locations={[0, 0.35, 0.65, 1]}
          start={{ x: 0, y: 0.3 }}  // different angle from primary — further breaks up bands
          end={{ x: 1, y: 0.7 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Static vertical depth — slightly deeper sage at top for sky atmosphere */}
      <LinearGradient
        colors={['rgba(60,85,72,0.18)', 'rgba(60,85,72,0.04)', 'transparent']}
        locations={[0, 0.35, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

// ─── Ghost input field ────────────────────────────────────────────────────────
function GhostField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.fieldContainer}>{children}</View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Hero — flex:1 so it compresses naturally when the form card is tall (sign up)
  hero: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 28,
    justifyContent: 'flex-end',  // anchors text to the bottom of available space
  },
  wordmark: {
    fontFamily: 'NotoSerif-Regular',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#506359',
    marginBottom: 14,
  },
  displayHeadline: {
    fontFamily: 'NotoSerif-Regular',
    fontStyle: 'italic',
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: -0.5,
    color: '#2f342e',
    marginBottom: 14,
  },
  tagline: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    color: '#5c605a',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },

  // Form card
  formCard: {
    backgroundColor: 'rgba(250, 249, 245, 0.97)',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 28,
    shadowColor: '#2f342e',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 8,
  },
  modeLabel: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    color: '#5c605a',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  formHeadline: {
    fontFamily: 'NotoSerif-Regular',
    fontStyle: 'italic',
    fontSize: 26,
    lineHeight: 32,
    color: '#2f342e',
  },

  // Input fields — explicit styles prevent descender clipping
  fieldLabel: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    color: '#5c605a',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  fieldContainer: {
    backgroundColor: '#f4f4ef',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    lineHeight: 22,               // explicit lineHeight prevents descender clipping
    color: '#2f342e',
    fontFamily: 'Manrope-Regular',
  },
  eyeButton: {
    paddingHorizontal: 14,
    paddingVertical: 13,
    justifyContent: 'center',
  },

  // Primary CTA
  ctaButton: {
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaLabel: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#e8fdf0',
    letterSpacing: 0.5,
  },

  // Or divider — uses ghost border (outline-variant @ 15% opacity per spec)
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(175, 179, 172, 0.25)',
  },
  dividerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#5c605a',
    marginHorizontal: 12,
  },

  // Google button — secondary style per spec
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e9e2',   // surface-container-high
    borderRadius: 24,
    paddingVertical: 13,
    gap: 10,
  },
  googleLabel: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: '#2f342e',
  },

  // Mode toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  toggleText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: '#5c605a',
  },
  toggleAction: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 13,
    color: '#506359',
  },
});
