'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

export const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 表单验证
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6个字符');
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 20) {
      setError('用户名长度应在3-20个字符之间');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        // 注册成功，跳转到主页
        router.push('/');
      } else {
        setError('注册失败，请稍后重试');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">注册账号</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <p>{error}</p>
          </Alert>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            邮箱
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="请输入邮箱"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            用户名
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="请输入用户名（3-20个字符）"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            密码
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="请输入密码（至少6个字符）"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            确认密码
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="请再次输入密码"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? '注册中...' : '注册'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={() => router.push('/login')}
          className="text-sm"
        >
          已有账号？点击登录
        </Button>
      </div>
    </div>
  );
};