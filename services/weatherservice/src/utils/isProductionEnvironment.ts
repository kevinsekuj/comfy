export default function isProductionEnvironment(): boolean {
  return (process.env.NODE_ENV || '').trim() === 'production';
}
