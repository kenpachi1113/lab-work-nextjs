import { NextResponse } from 'next/server';
import { runAdapterTask } from '@/lib/patterns/adapter';
import { runDecoratorTask } from '@/lib/patterns/decorator';
import { runBridgeTask } from '@/lib/patterns/bridge';
import { runProxyTask } from '@/lib/patterns/proxy';
import { runCompositeTask } from '@/lib/patterns/composite';
import { runFlyweightTask } from '@/lib/patterns/flyweight';

export async function GET() {
  console.log('\n========================================');
  console.log('=== ЗАПУСК ЛАБОРАТОРНОЇ РОБОТИ №3 ===');
  console.log('========================================\n');

  try {
    runAdapterTask();
    runDecoratorTask();
    runBridgeTask();
    runProxyTask();
    runCompositeTask();
    runFlyweightTask();

    console.log('\n=== РОБОТУ ЗАВЕРШЕНО ===\n');

    return NextResponse.json({
      status: 'success',
      message: 'Виконайте команду в терміналі, щоб побачити логи',
    });
  } catch (error) {
    console.error('Error during execution:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Помилка виконання. Перевірте термінал.',
      },
      { status: 500 }
    );
  }
}